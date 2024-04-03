export class MainFilesService {
  baseUrl = "/file";

  constructor(instance) {
    this.instance = instance;
  }

  async getAllFiles(signal) {
    const response = await this.instance.get(this.baseUrl, {
      ...(signal && { signal }),
    });
    return response.data;
  }

  async getSearchFiles(name) {
    const response = await this.instance.get(`${this.baseUrl}/search`, {
      params: { name },
    });
    return response.data;
  }

  async getOneFile(id, signal) {
    const response = await this.instance.get(`${this.baseUrl}/${id}`, {
      ...(signal && { signal }),
    });
    return response.data;
  }

  async deleteFile(id) {
    const response = await this.instance.delete(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async createFile(file, folderId) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", folderId);
    const response = await this.instance.post(this.baseUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}
