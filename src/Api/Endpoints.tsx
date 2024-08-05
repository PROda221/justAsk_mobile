export const Endpoints = {
  // Auth
  login: '/users/login',
  googleLogin: '/users/googleLogin',
  signUp: '/users/signUp',
  checkUser: '/users/checkUser',
  sendOtp: '/users/otp/send',
  verifyOtp: '/users/otp/verify',
  forgotPass: '/users/forgotPass',
  checkUsername: '/users/checkUsername',

  // App
  search: '/users/search',
  profile: '/users/getProfile',
  deviceToken: '/users/notificationToken',
  userProfile: '/users/profile',
  getYourComment: '/users/feedback/getyourcomment',
  addCommenet: '/users/feedback/add',
  getAllComments: '/users/feedback',
  profileUpload: '/users/upload',
  blockUser: '/users/blocked/add',
  getAllBlocked: '/users/blocked/getAll',
  unblockUser: '/users/blocked/unblock',
  multiUnblock: '/users/blocked/multiUnblock',
};
