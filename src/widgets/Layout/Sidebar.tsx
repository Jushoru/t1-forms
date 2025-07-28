import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/Person";
import {ListItemIcon} from "@mui/material";
import {Link} from 'react-router-dom';

export const Sidebar = () => {
    return (
        <div className="flex flex-col w-[240px] bg-1">
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Главная" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/user/create">
                        <ListItemIcon>
                            <PersonAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Создать пользователя" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
};