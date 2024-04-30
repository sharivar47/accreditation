const PageSize = ({changePageSize}) => {
    const sizes = [10,20,30,50,100, 200]
    const onChangePage = (e) => {
        changePageSize(e.target.value)
    }
  return(<select onChange={(event) => onChangePage(event)} className="form-control page-size-selection ">
      {sizes.map(item => (
          <option key={item}>{item}</option>
      ))}
  </select>)
}
export default PageSize