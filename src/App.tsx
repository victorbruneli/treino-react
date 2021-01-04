import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

const Componente = () => {
  const [players, setPlayers] = useState([
      {id: 1, nome: 'Player 1 - '},
      {id: 2, nome: 'Player 2 - '},
      {id: 3, nome: 'Player 3 - '},
      {id: 4, nome: 'Player 4 - '},
      {id: 5, nome: 'Player 5 - '},
  ]);
  const [namePlayer, setNamePlayer] = useState('');
  const [editPlayer, setEditPlayer] = useState({id:0, nome:''});

  //add player
  function AddPlayer(addID:any){
    addID.preventDefault();
    if(namePlayer !== ''){
      setPlayers([...players, {id: Date.now(), nome: namePlayer }]);
      setNamePlayer('');
    }else{
      alert('erro!');
    }
  };

  //edit Player
  function editaPlayer(addID:any){
    addID.preventDefault();
    if(editPlayer.id !== 0){
      if(editPlayer.nome === ''){
        alert('erro!');
        return;
      }
    }

    const list = [...players];
    const indexPlayer = list.findIndex(addID => addID.id === editPlayer.id);

    list[indexPlayer] = editPlayer;
    
    setPlayers(list);

    setEditPlayer({id:0, nome:''});
  };
  
  //remove Player
  function removePlayer(idPessoa:any){
  };

  //remove ALL
  function removeAllPlayer(idPessoa:any){
    return setPlayers([]);
  };

  return(
    <>
        <div>
        {players.map(player =>(
          <div>
              {player.nome}
              <button onClick={() => setEditPlayer(player)}>Editar</button>
              <button onClick={() => removePlayer(player.id)}>Remover</button>
          </div>
        ))}
        </div>
        <form onSubmit={(addID) => AddPlayer(addID)}>
              <label htmlFor="nome">Nome:</label>
              <input id="nome" type="text" value={namePlayer} onChange={addID => setNamePlayer(addID.target.value)}/>
              <button type="submit">Adicionar Player</button>
              <button type="button" onClick = {() => removeAllPlayer(players)}>Remove all Players</button>
        </form>
        {editPlayer.id !== 0 &&(
                <form onSubmit={(addID) => editaPlayer(addID)}>
                <label htmlFor="nome">Nome:</label>
                <input id="nome" type="text" value={editPlayer.nome} onChange={addID => setEditPlayer({id: editPlayer.id, nome: addID.target.value})}/>                <button type="submit">Atualizar Player</button>
            </form>
        )}
    </>
    )
  };

export default Componente;
