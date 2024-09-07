import { ITag, IResponse } from '../../interfaces';
import { BaseService } from '../services/base';

export class TagService {

    static getAll = async (): Promise<ITag[]> => {
        const result = await BaseService.createInstance().get('Tag/Get');
        return result.data;
    }

    static getById = async (tagId: number): Promise<ITag> => {
        const result = await BaseService.createInstance().get(`Tag/Get/${tagId}`);
        return result.data;
    }

    static add = async (tag: ITag): Promise<IResponse> => {
        const result = await BaseService.createInstance().post('Tag/Post', tag);
        return result.data;
    }

    static update = async (tag: ITag): Promise<IResponse> => {
        const result = await BaseService.createInstance().put(`Tag/Put/${tag.tagId}`, tag);
        return result.data;
    }

    static delete = async (tagId: number): Promise<IResponse> => {
        const result = await BaseService.createInstance().delete(`Tag/Delete/${tagId}`);
        return result.data;
    }
}
