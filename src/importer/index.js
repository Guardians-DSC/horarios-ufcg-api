import loadFromJSON from "./json";

const source = "json";

const importHorarios = () => {
  switch (source) {
    case "json":
      return loadFromJSON();
    default:
      return [];
  }
};

export default importHorarios;
