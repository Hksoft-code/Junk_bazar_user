const NODE_ENV = "prod";
console.log('NODE_ENV', NODE_ENV);
export const serverUrl = (NODE_ENV.toLowerCase() === 'development') ? 'https://serverpprod.hksoftware.in/api/v1/users' :(NODE_ENV.toLowerCase() === 'prod')? "https://server.junkbazar.com/api/v1/users":"http://localhost:5000/api/v1/users";