import React, {useContext, useEffect, useState} from 'react';
import {getConversations} from "../API/methods/messages";
import {ThisUserContext} from "../context/thisUser_context";
import "../styles/app.css";
import {useHistory} from "react-router-dom";
import {CompanionContext} from "../context/companion_context";
import {getById} from "../API/methods/users";

const ListChats = () => {
  const [list, setList] = useState([])
  const [isLoadList, setIsLoadList] = useState(true)
  const {thisUser, setThisUser} = useContext(ThisUserContext)
  const {companion, setCompanion} = useContext(CompanionContext)
  const router = useHistory()

  const foo = async () => {
    await getConversations().then(res => {
      console.log(res.data)
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

  const selectDialog = async (e) =>{
    const id = e.target.dataset.value
    await getById(id).then(res => setCompanion(res.data))
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
                        dialog.second_user.first_name
                        :
                        dialog.first_user.first_name
                  }
                </div>
            )
        }
      </div>
  );
};

export default ListChats;