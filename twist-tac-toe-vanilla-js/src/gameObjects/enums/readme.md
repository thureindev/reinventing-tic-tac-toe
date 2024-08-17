# Enums with string values

I needed to check game states and players without using database and I didn't want to tweak around more Classes. And consistency in alling string names is very important. Which is why I had all these enums

`GameState`
> for game state, I need specific values and check them all over the game logic. 

`Role`
> player 1 or player 2 and also I need to check draw condition. which is null.

`GameProp` 
> I needed a polymorphed update function for all the game properties. and I need to check the args for prop name. which is why, I needed this enum.
