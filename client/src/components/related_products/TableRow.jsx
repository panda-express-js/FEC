import React from 'react'

const TableRow = ({featureName, mainFeatures, relatedFeatures}) => {
  //finds first object that has the current featureName
  const mainFeatureObject = mainFeatures.find((item) => item.feature === featureName);
  const relatedFeatureObject = relatedFeatures.find((item) => item.feature === featureName);

  return (
    <tr>
      <td>{mainFeatureObject ? (mainFeatureObject.value !== null ? mainFeatureObject.value : '\u2713') : null}</td>
      <td>{featureName}</td>
      <td>{relatedFeatureObject ? (relatedFeatureObject.value !== null ? relatedFeatureObject.value : '\u2713') : null}</td>
    </tr>
  );
}

export default TableRow;