# Connection between event-callbacks

Three inputs `changed-board-size` `changed-win-length` `changed-num-pieces` are connected to each other. 

`win-length` cannot exceed `board-size` 

`num-pieces` cannot exceed `win-length`

Which is why `changed-board-size` function updates `win-length` and `num-pieces` as well as change updated value on their html input elements `changed-win-length` and `changed-num-pieces`.

> [!NOTE]
> game object already resolve the connection between those 3 variables. These event-callback funcs only need to handle view updates and config file update.

# Better Structure

There is indeed a better structure to resolve it. There should be a function for config update and view update and 
a. update all the config variables in config file and update all the config view components.
b. take arg and update necessary updates. 

> The first one is obviously a no-brainer. Dull yet effective solution.

> The second one is more optimized. But wouldn't make any significant difference unless the game config file is too big or view components are too many.

For now, this is a raw Vanilla JS program. Purpose of this program is to study programming. So I won't spend any more time on this. I'll move on to using frameworks and library and only then apply the said structure for better optimization. 

---