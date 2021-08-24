import React, { useCallback } from 'react'
import ExitToOutlinedAppIcon from '@material-ui/icons/ExitToAppOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../interface/rootstate';
import { Button, CircularProgress } from '@material-ui/core';

import { logoutRequestAction } from '../reducers/user'

const UserMenu: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const { logOutLoading } = useSelector((state:RootState)=> state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
      <>
        <Button onClick={onLogout} disabled={logOutLoading}>
          {logOutLoading ? <CircularProgress size={15} /> : <ExitToOutlinedAppIcon/>}
        </Button>
        <Link href="/userprofile"><Button><SettingsOutlinedIcon/></Button></Link>
      </>
  )
}

export default UserMenu