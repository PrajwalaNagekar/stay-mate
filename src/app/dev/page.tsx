"use client";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";

export default function Dev() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                    >
                        Testing place
                    </ListSubheader>
                }
            >
                <ListItemButton component={Link} href="/dev/chat">
                    <ListItemText secondary="Chat" />
                </ListItemButton>

                <ListItemButton component={Link} href="/dev/plan">
                    <ListItemText secondary="Plans" />
                </ListItemButton>
            </List>
        </div>
    );
}