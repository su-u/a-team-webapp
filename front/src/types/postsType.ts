import postType from './postType';
import messageType from './messageType';

type postsType = {
    status: 'ERROR' | 'SUCCESS';
    message: string;
    data: postType;
    messages: messageType[];
}
export default postsType;
