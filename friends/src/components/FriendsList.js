import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useForm } from "react-hook-form";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import styled from "styled-components";

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

  // const hideBtnHandler = () => {
  //   const hideBtn = isLoading;
  //   if (isLoading) {
  //     return <div></div>;
  //   }
  //   return <Button type="submit">Add Friend!</Button>;
  // };

  return (
    <Container>
      <Logo
        src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Friends_logo.svg"
        alt="friends-logo"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <H2>Add another friend to your list</H2>
        <FlexContainer>
          <Label htmlFor="name">Name: </Label>
          <Input
            name="name"
            type="text"
            placeholder="Enter Name Here"
            ref={register}
          />

          <Label htmlFor="age">Age: </Label>
          <Input
            name="age"
            type="text"
            placeholder="Enter Age Here"
            ref={register}
          />

          <Label htmlFor="email">Email Address: </Label>
          <Input
            name="email"
            type="text"
            placeholder="Enter Email Here"
            ref={register}
          />
          <Button type="submit">Add Friend</Button>
        </FlexContainer>
      </form>

      <FlexContainer>
        <Loader
          type="Bars"
          color="#fabc16"
          height={200}
          width={200}
          timeout={1000} //3 secs
        />
      </FlexContainer>

      <FlexCards>
        {friends.map((friend) => {
          return (
            <DataCard className="container" key={friend.id}>
              <h3>{friend.name}</h3>
              <p>{friend.email}</p>
              <p>{friend.age}</p>
              <CardBtn onClick={() => removeFriend(friend.id)}>
                Remove Friend
              </CardBtn>
            </DataCard>
          );
        })}
      </FlexCards>
    </Container>
  );
};

export default FriendsList;

const Logo = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;

const Button = styled.button`
  padding: 0.5em;
  background-color: papayawhip;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  color: crimson;
  width: 100px;
`;

const CardBtn = styled(Button)`
  width: 125px;
`;

const Input = styled.input`
  margin-right: 1rem;
  padding: 0.5em;
  background: papayawhip;
  color: crimson;
  border-radius: 10px;
  font-weight: bold;
  &::-webkit-input-placeholder {
    color: palevioletred;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 1000px;
  background-color: #282c34;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #fabc16;
  margin-right: 5px;
`;

const H2 = styled.h2`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
  color: #fabc16;
`;

const DataCard = styled.div`
  color: #fabc16;
  margin: auto auto;
`;

const FlexCards = styled.div`
  display: flex;
`;
