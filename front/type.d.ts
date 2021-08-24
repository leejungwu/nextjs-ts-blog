// redux.d.ts
import 'redux';
import { Task } from 'redux-saga';

declare module 'redux' {
  export interface Store {
    sagaTask?: Task;
  }
}
declare module 'ckeditor5-classic-plus';
declare module '@ckeditor/ckeditor5-build-classic';
declare module 'redux-persist/lib/storage';

declare module 'dayjs' {
  interface Dayjs {
      fromNow();
  }
}