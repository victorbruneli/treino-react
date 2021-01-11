import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

interface Player
{
id:number, 
nome:string
}


const Componente = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [namePlayer, setNamePlayer] = useState('');
  const [editPlayer, setEditPlayer] = useState({id:0, nome:''});
  

  useEffect(() => {
    if (localStorage) {
      const playerString = localStorage.getItem('players');
      if (playerString) {
        setPlayers(JSON.parse(playerString));
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage) {
      const playersString = JSON.stringify(players);
      localStorage.setItem('players', playersString);
    }
  }, [players]);

  
  //add player
  function AddPlayer(addID:any){
    addID.preventDefault();
    if(namePlayer.trim() !== ''){
      setPlayers([...players, {id: Date.now(), nome: namePlayer.trim() }]);
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
  function removePlayer(idPlayer:any){
    const filteredPlayer = players.filter(p => p.id !== idPlayer);

    setPlayers(filteredPlayer);
  };

  //remove ALL
  function removeAllPlayer(idPlayer:any){
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
              <button type="button" onClick = {() => removeAllPlayer(players)}>Remove todos</button>
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
