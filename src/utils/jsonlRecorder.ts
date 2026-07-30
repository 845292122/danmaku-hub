import { isElectron } from '@/platform/runtime';

export interface JsonlRecorderOptions {
  name: string;
  ext?: string;
  mimeType?: string;
  description?: string;
}

const ensureExtension = (filename: string, ext: string) => (filename.endsWith(ext) ? filename : `${filename}${ext}`);

export class JsonlRecorder<T> {
  private writable: FileSystemWritableFileStream | undefined;
  private queue: Promise<void> = Promise.resolve();
  private count = 0;
  private filename = '';
  private mode: 'electron' | 'fsa' | undefined;

  get isRecording() {
    return !!this.mode;
  }

  get recordCount() {
    return this.count;
  }

  get fileName() {
    return this.filename;
  }

  static isSupported() {
    return isElectron() || 'showSaveFilePicker' in window;
  }

  async start(options: JsonlRecorderOptions) {
    if (this.mode) throw new Error('记录器已启动');
    if (!JsonlRecorder.isSupported()) throw new Error('当前环境不支持流式写入文件');

    const ext = options.ext || '.jsonl';
    const suggestedName = ensureExtension(options.name, ext);

    if (isElectron()) {
      const result = await window.electronAPI!.castRecord.start(suggestedName);
      if (!result) {
        const err = new Error('用户取消操作');
        err.name = 'AbortError';
        throw err;
      }
      this.mode = 'electron';
      this.queue = Promise.resolve();
      this.count = 0;
      this.filename = result.path;
      return;
    }

    const mimeType = options.mimeType || 'application/x-ndjson';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileHandle = await (window as any).showSaveFilePicker({
      suggestedName,
      types: [
        {
          description: options.description || 'JSON Lines',
          accept: { [mimeType]: [ext] }
        }
      ]
    });

    this.writable = await fileHandle.createWritable();
    this.mode = 'fsa';
    this.queue = Promise.resolve();
    this.count = 0;
    this.filename = fileHandle.name;
  }

  write(records: T[]) {
    const mode = this.mode;
    if (!mode || records.length === 0) return this.queue.then(() => this.count);

    const payload = `${records.map(record => JSON.stringify(record)).join('\n')}\n`;
    if (mode === 'electron') {
      this.queue = this.queue.then(async () => {
        this.count = await window.electronAPI!.castRecord.write(payload, records.length);
      });
    } else {
      const writable = this.writable;
      if (!writable) return this.queue.then(() => this.count);
      this.queue = this.queue.then(async () => {
        await writable.write(payload);
        this.count += records.length;
      });
    }

    return this.queue.then(() => this.count);
  }

  async stop() {
    const mode = this.mode;
    if (!mode) return this.count;

    this.mode = undefined;
    if (mode === 'electron') {
      let writeError: unknown;
      try {
        await this.queue;
      } catch (err) {
        writeError = err;
      }
      const result = await window.electronAPI!.castRecord.stop();
      if (result) {
        this.count = result.count;
        this.filename = result.path;
      }
      if (writeError) throw writeError;
      return this.count;
    }

    const writable = this.writable;
    if (!writable) return this.count;
    this.writable = undefined;
    let writeError: unknown;
    try {
      await this.queue;
    } catch (err) {
      writeError = err;
    } finally {
      await writable.close();
    }
    if (writeError) throw writeError;
    return this.count;
  }
}
