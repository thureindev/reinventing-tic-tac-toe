# Data module

## GameConfig 
> It is the game configuration file. In a NodeJS environment it should be data extracted from database or a game config file. Since this is VanillaJS version and runs on browser javascript, I use this raw object and export it. 

## Game
> In a better OOP structure. the Game class should be in Singleton pattern. I just discovered that while refactoring. I used the same export method, and just referance that instance from anywhere in the modules. 

