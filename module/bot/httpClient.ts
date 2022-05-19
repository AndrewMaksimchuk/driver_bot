import { TResponse } from './bot_api_types.ts';

export const get = async <T>(input: string): Promise<TResponse<T>> => {
    const response = await fetch(input);
    // if (response.status === 200) {
    //     const data = await response.json() as IResponseSuccess<T>;
    //     return data;
    // }
    // const data = await response.json() as IResponseError;
    // return data;

    // return response.status === 200
    //     ? await response.json() as IResponseSuccess<T>
    //     : await response.json() as IResponseError;

    return await response.json();
};

export default {
    get,
}