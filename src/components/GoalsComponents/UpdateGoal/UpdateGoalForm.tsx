import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { getGoal, updateGoal } from "@src/api/GoalsAPI";
import { darkModeState } from "@store";
import { colorPallete } from "@src/utils";
import { displayUpdateGoal, extractedTitle, inputGoalTags, selectedColorIndex } from "@src/store/GoalsState";
import InputGoal from "../InputGoal";

import "@translations/i18n";
import "./UpdateGoalForm.scss";

export const UpdateGoalForm = () => {
  const darkModeStatus = useRecoilValue(darkModeState);
  const [showUpdateGoal, setShowUpdateGoal] = useRecoilState(displayUpdateGoal);

  const [error, setError] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [goalTitle, setGoalTitle] = useRecoilState(extractedTitle);
  const [goalTags, setGoalTags] = useRecoilState(inputGoalTags);
  const [goalLang, setGoalLang] = useState("english");
  const [colorIndex, setColorIndex] = useRecoilState(selectedColorIndex);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (goalTitle.length === 0) {
      setError("Enter a goal title!");
      return;
    }
    await updateGoal(showUpdateGoal?.goalId,
      { title: goalTitle.split(" ").filter((ele) => ele !== "").join(" "),
        goalColor: colorPallete[selectedColorIndex],
        duration: goalTags.duration ? goalTags.duration.value : null,
        repeat: goalTags.repeats ? goalTags.repeats.value : null,
        link: goalTags.link ? goalTags.link.value?.trim() : null,
        start: goalTags.start ? goalTags.start.value : null,
        due: goalTags.due ? goalTags.due.value : null,
        afterTime: goalTags.afterTime ? goalTags.afterTime.value : null,
        beforeTime: goalTags.beforeTime ? goalTags.beforeTime.value : null,
      });
    setGoalTitle("");
    setShowUpdateGoal(null);
    setGoalTags({});
    setColorIndex(0);
  };

  useEffect(() => {
    getGoal(showUpdateGoal?.goalId).then((goal) => {
      let tmpTiming = "";
      if (goal.afterTime && goal.beforeTime) {
        tmpTiming = ` ${goal.afterTime}-${goal.beforeTime}`;
      } else if (goal.afterTime) {
        tmpTiming = ` after ${goal.afterTime}`;
      } else if (goal.beforeTime) {
        tmpTiming = ` before ${goal.beforeTime}`;
      }
      setColorIndex(colorPallete.indexOf(goal.goalColor));
      let inputText = "";
      inputText += goal.title;
      inputText += goal.duration ? ` ${goal.duration}hours` : "";
      inputText += goal.start ? ` start ${goal.start.getDate()}/${goal.start.getMonth() + 1} @${goal.start.getHours()}` : "";
      inputText += goal.due ? ` due ${goal.due.getDate()}/${goal.due.getMonth() + 1} @${goal.due.getHours()}` : "";
      inputText += goal.repeat ? ` ${goal.repeat}` : "";
      inputText += tmpTiming;
      inputText += goal.link ? ` ${goal.link}` : "";
      setGoalInput(inputText);
      if (goal.language) setGoalLang(goal.language);
    });
  }, []);

  const changeColor = () => {
    const newColorIndex = colorIndex + 1;
    if (colorPallete[newColorIndex]) setColorIndex(newColorIndex);
    else setColorIndex(0);
  };

  return (
    <form id="updateGoalForm" className="todo-form" onSubmit={handleSubmit}>
      {
          goalInput !== "" && (
          <InputGoal
            goalInput={goalInput}
            selectedColor={colorPallete[colorIndex]}
            goalLang={goalLang}
          />
          )
      }
      <button
        type="button"
        style={
          darkModeStatus
            ? { backgroundColor: colorPallete[colorIndex] }
            : { backgroundColor: colorPallete[colorIndex] }
        }
        id="changeColor-btn"
        className="form-tag"
        onClick={changeColor}
      >
        Color
      </button>
      <div style={{ marginLeft: "10px", marginTop: "10px", color: "red", fontWeight: "lighter" }}>{error}</div>
    </form>
  );
};