import { randSlug } from "./slugs";

const temp = [
  "urgent",
  "hard",
  "long-term",
  "easy",
  "normal",
  "hard-and-urgent",
];

const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const randomHomework = (n: number) => {
  return Array.from(Array(n).keys()).map((each) => {
    return {
      __typename: "Homework" as "Homework",
      id: each,
      title: `${randSlug()}`,
      description: "You hate dancin",
      deadline: (() => {
        var d = randomDate(new Date("2020-08-01"), new Date("2021-08-31"));
        d.setHours(0), d.setMinutes(0), d.setSeconds(0), d.setMilliseconds(0);
        return d.valueOf();
      })(),
      subjectId: Math.ceil(Math.random() * 10),
      done: Math.random() < 0.5,
      onTime: true,
      enjoyed: false,
      topicName: "GCSE eglish literature language techniques",
      userId: 3,
      tag: temp[
        Math.random() < 0.15 ? 0 : Math.ceil(Math.random() * (temp.length - 1))
      ],
    };
  });
};
