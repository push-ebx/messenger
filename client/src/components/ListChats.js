import React, {useEffect, useState} from 'react';
import {getConversations} from "../API/methods/messages";
import "../styles/app.css";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getById} from "../API/methods/users";
import {setCompanionAction} from "../store/companionReducer";

const ListChats = () => {
  const thisUser = useSelector(state => state.thisUserReducer.thisUser)
  const [list, setList] = useState([])
  const [isLoadList, setIsLoadList] = useState(true)
  const router = useHistory()
  const dispatch = useDispatch()

  const foo = async () => {
    await getConversations().then(res => {
      setList(res.data)
      setIsLoadList(false)
    })
  }

  useEffect(() => {
    foo()
  }, [])

  const getDialogId = (dialog)  => {
    return dialog.first_user.id === thisUser.id ? dialog.second_user.id : dialog.first_user.id
  }

  const selectDialog = async (e) => {
    const id = e.target.dataset.value
    await getById(id).then(res => dispatch(setCompanionAction(res.data)))
    router.push(`/chats/${id}`)
  }

  return (
      <div className="chatList">
        {
            !isLoadList
            &&
            list.map(dialog =>
                <div className="glass dialog" onClick={e => selectDialog(e)} data-value={getDialogId(dialog)} key={dialog._id}>
                  {
                    dialog.first_user.id === thisUser.id
                        ?
                        `${dialog.second_user.first_name} ${dialog.second_user.last_name}`
                        :
                        `${dialog.first_user.first_name} ${dialog.first_user.last_name}`
                  }
                </div>
            )
        }
      </div>
  );
};

export default ListChats;