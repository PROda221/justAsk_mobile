/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice} from '@reduxjs/toolkit';

type ReplyMsgType = {
  replyMsgId: string;
  mainMsgIndex: number;
}

const initialState: {
  inChatScreen: boolean;
  replyMsg: ReplyMsgType;
} = {
  inChatScreen: false,
  replyMsg: {
    replyMsgId: '',
    mainMsgIndex: 0
  }
};

const localReducer = createSlice({
  name: 'localReducer',
  initialState,
  reducers: {
    setInChatScreen(state, action) {
      state.inChatScreen = action.payload;
    },
    setReplyMsgId(state,action){
      state.replyMsg = action.payload
    }
  },
});

export const {setInChatScreen, setReplyMsgId} = localReducer.actions;

export default localReducer.reducer;
