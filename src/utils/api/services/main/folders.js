export class MainFoldersService {
  baseUrl = "/folder";

  constructor(instance) {
    this.instance = instance;
  }

  async getAllFolders(signal) {
    const response = await this.instance.get(this.baseUrl, {
      ...(signal && { signal }),
    });
    return response.data;
  }

  async getSearchFolders(name) {
    const response = await this.instance.get(`${this.baseUrl}/search`, {
      params: { name },
    });
    return response.data;
  }

  async getOneFolder(id, signal) {
    const response = await this.instance.get(`${this.baseUrl}/${id}`, {
      ...(signal && { signal }),
    });
    return response.data;
  }

  async deleteFolder(id, signal) {
    const response = await this.instance.delete(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async createFolder(name) {
    const response = await this.instance.post(`${this.baseUrl}`, {
      name,
    });
    return response.data;
  }
}
