import { List, ListItem, ListItemText } from "@material-ui/core";
import React, { memo } from "react";

export default memo(props => {
  return (
    <List dense>
      {props.items.map(pokemon => {
        return (
          <ListItem button key={pokemon.name}>
            <ListItemText primary={pokemon.name} />
          </ListItem>
        );
      })}
    </List>
  );
});
