const NODE_ENV = "development";
console.log('NODE_ENV', NODE_ENV);
export const serverUrl = (NODE_ENV.toLowerCase() === 'development') ? 'https://serverpprod.hksoftware.in/api/v1/users' : "https://server.junkbazar.com/api/v1/users";