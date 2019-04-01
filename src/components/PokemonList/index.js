import { List, ListItem, ListItemText } from "@material-ui/core";
import React, { memo } from "react";
export default memo(props => {
  return (
    <List dense>
      {props.items.map(pokemon => {
        const { name } = pokemon;
        const cb = () => props.navigate(name);
        return (
          <ListItem button key={name} onClick={cb}>
            <ListItemText primary={name} />
          </ListItem>
        );
      })}
    </List>
  );
});
