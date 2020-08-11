import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useForm } from "react-hook-form";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);

    setTimeout(() => {
      axiosWithAuth()
        .post("/api/friends", data)
        .then((res) => {
          setIsLoading(false);
          setFriends(res.data);
        })
        .catch((err) => console.error(err));

      reset();
    }, 1000);
  };

  const removeFriend = (id) => {
    axiosWithAuth()
      .delete(`/api/friends/${id}`)
      .then((res) => setFriends(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axiosWithAuth()
      .get("/api/friends")
      .then((res) => {
        console.log(res.data);
        setFriends(res.data);
      });
  }, []);

  const hideBtnHandler = () => {
    const hideBtn = isLoading;
    if (isLoading) {
      return <div></div>;
    }
    return <button type="submit">Add Friend!</button>;
  };

  return (
    <div>
      <h1>Friends List!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Add another friend to your list</h2>
        <div className="container">
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            type="text"
            placeholder="Enter Name Here"
            ref={register}
          />
        </div>
        <div className="container">
          <label htmlFor="age">Age: </label>
          <input
            name="age"
            type="text"
            placeholder="Enter Age Here"
            ref={register}
          />
        </div>
        <div className="container">
          <label htmlFor="email">Email Address: </label>
          <input
            name="email"
            type="text"
            placeholder="Enter Email Here"
            ref={register}
          />
        </div>

        <button onLoad={hideBtnHandler} type="submit">
          Add Friend!
        </button>
      </form>
      {isLoading && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={1000} //3 secs
        />
      )}

      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={1000} //3 secs
      />

      {friends.map((friend) => {
        return (
          <div className="container" key={friend.id}>
            <h3>{friend.name}</h3>
            <p>{friend.email}</p>
            <p>{friend.age}</p>
            <button onClick={() => removeFriend(friend.id)}>
              Remove Friend
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FriendsList;
