// export const validUsername = new RegExp("[[^A-Za-z0-9]+]+.+[[^A-Za-z0-9]+]");

export const validUsername = new RegExp("^([a-z]+)\\.([a-z]+)$");

export const validPassword = new RegExp("^([A-Za-z0-9]+)$");
