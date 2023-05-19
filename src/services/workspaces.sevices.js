import instance from "~/interceptors/axios";

export const getAllMemberWorkspace = async (userId) => {
    return await instance.get(`/workspace/${userId}/user`);

};
export const createColumn = async (body) => {
    return await instance.post(`/column`, body);

};
export const createWorkspace = async (body) => {
    return await instance.post(`/workspace`, body);

};
export const getWorkspaceById = async (userId) => {
    return await instance.get(`/workspace/${userId}`);

};
export const moveCardToColumn = async (cardId, columnId) => {
    return await instance.get(`/cards/${cardId}/moveTo/${columnId}`);

};
export const createCard = async (body) => {
    return await instance.post(`/cards`, body);

};
export const getAllWorkspacesByUserId = async (userId) => {
    return await instance.get(`/workspace/user?userId=${userId}`);

};
export const addMemberToCard = async (cardId, email) => {
    return await instance.get(`/cards/${cardId}/member/${email}`);

};

export const addMemberToWorkSpace = async (wSpaceId, email) => {
    return await instance.post(`/workspace/${wSpaceId}/member/${email}`);

};

export const searchUserByEmail = async (email) => {
    return await instance.get(`/user/search/${email}`);
}
export const updateCardTitle = async (id, body) => {
    return await instance.put(`/cards/${id}`, body);
}
export const deleteColumById = async (id) => {
    return await instance.delete(`/column/${id}`);
}
export const updateTitleColumn = async (id, body) => {
    return await instance.put(`/column/${id}`, body);
}
export const searchUserInWorkSpace = async (workspace, email) => {
    return await instance.get(`/user/search/${workspace}/${email}`)
}



