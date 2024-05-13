import React, { useState, useEffect } from "react";
import GroupPopup from "./GroupPopup";
import Right from "./Right";
import "./CSS/Left.css";
import eclipseimage from "../assets/Ellipse.png";

function Left() {
  const [showPopup, setShowPopup] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("groups"));
    if (savedGroups) {
      setGroups(savedGroups);
    }
  }, []);

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSaveGroup = (groupName, groupColor) => {
    const newGroup = { name: groupName, color: groupColor };
    setGroups([...groups, newGroup]);
    setShowPopup(false);

    localStorage.setItem("groups", JSON.stringify([...groups, newGroup]));
  };

  const handleGroupSelection = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "25%", background: "white", height: "100vw" }}>
        <div
          className="pocket-notes"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginLeft: "center" }}>Pocket Notes</h2>
        </div>

        <div
          className="group-added"
          style={{ display: "flex", flexDirection: "column", gap: "1rem", fontWeight:'bold' }}
        >
          {groups.map((group, index) => (
            <div
              key={index}
              style={{
                // display: "flex",
                // justifyContent: "center",
                marginLeft:'3em',
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => handleGroupSelection(group)}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  background: group.color,
                  marginRight: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                {group.name
                  .split(" ") // Split the group name into words
                  .map((word) => word.charAt(0)) // Extract the first letter of each word
                  .join("") // Concatenate the first letters together
                  .toUpperCase()}{" "}
                {/* Convert to uppercase if necessary */}
              </div>
              <div>{group.name}</div>
            </div>
          ))}
        </div>

        {showPopup && (
          <GroupPopup onClose={handleTogglePopup} onSave={handleSaveGroup} />
        )}
        <div
          className="ellipse"
          style={{ display: "flex", justifyContent: "end", position: "sticky" }}
        >
          <img src={eclipseimage} alt="" onClick={handleTogglePopup} />
        </div>
      </div>
      <Right selectedGroup={selectedGroup} />
    </div>
  );
}

export default Left;
