const usersEndpoint = 'users';

export const Endpoints = {
  // Auth
  login: `/${usersEndpoint}/login`,
  googleLogin: `/${usersEndpoint}/googleLogin`,
  signUp: `/${usersEndpoint}/signUp`,
  checkUser: `/${usersEndpoint}/checkUser`,
  sendOtp: `/${usersEndpoint}/otp/send`,
  verifyOtp: `/${usersEndpoint}/otp/verify`,
  forgotPass: `/${usersEndpoint}/forgotPass`,
  checkUsername: `/${usersEndpoint}/checkUsername`,

  // App
  search: `/${usersEndpoint}/search`,
  profile: `/${usersEndpoint}/getProfile`,
  deviceToken: `/${usersEndpoint}/notificationToken`,
  userProfile: `/${usersEndpoint}/profile`,
  getYourComment: `/${usersEndpoint}/feedback/getyourcomment`,
  addCommenet: `/${usersEndpoint}/feedback/add`,
  getAllComments: `/${usersEndpoint}/feedback`,
  profileUpload: `/${usersEndpoint}/upload`,
  blockUser: `/${usersEndpoint}/blocked/add`,
  getAllBlocked: `/${usersEndpoint}/blocked/getAll`,
  unblockUser: `/${usersEndpoint}/blocked/unblock`,
  multiUnblock: `/${usersEndpoint}/blocked/multiUnblock`,
  logout: `/${usersEndpoint}/logout`,
  deactivate: `/${usersEndpoint}/deactivate`,
  activate: `/${usersEndpoint}/activate`,
};
