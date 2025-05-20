const SkeletonLoading = ({ quantity }) => {
  return Array.from({ length: quantity }).map((_) => (
    <tr style={{ padding: "8px" }}>
      <td>
        <div className="skeleton skeleton-text"></div>
      </td>
      <td>
        <div className="skeleton skeleton-text"></div>
      </td>
      <td>
        <div className="skeleton skeleton-text"></div>
      </td>
      <td>
        <div className="skeleton skeleton-text"></div>
      </td>
    </tr>
  ));
};

export default SkeletonLoading;
