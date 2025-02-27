import sectionData from "./sectionData.json";

// StartDate and endDate are expected to be a Date object but you cant store Date objects in json.
// So parse the json and transform the date strings into a new Date object and use that as the export.
const mockSectionData = sectionData.map(({positions, ...rest}) => {
  return {
    ...rest,
    positions: positions.map(({startDate, endDate, ...rest}) => {
      return {
        ...rest,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      };
    }),
  };
});

// Separate imports from exports because you cant re-export the json, it must be imported and parsed (i assume happens automatically) first.
export {generateMockDisplays, getMockDisplays} from "./displays";
export {generateMockKeywords, getMockKeywords} from "./keywords";
export {mockSectionData};
