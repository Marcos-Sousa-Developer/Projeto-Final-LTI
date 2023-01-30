import React from "react";

function TopVendas() {
  return (
    <div className="col-12">
      <div className="card top-selling overflow-auto">
        <div className="filter">
          <a className="icon" href="#" data-bs-toggle="dropdown">
            <i className="bi bi-three-dots" />
          </a>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li className="dropdown-header text-start">
              <h6>Filter</h6>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Today
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                This Month
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                This Year
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body pb-0">
          <h5 className="card-title">
            Top 5 de Produtos vendidos <span>| Today</span>
          </h5>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Preview</th>
                <th scope="col">Produto</th>
                <th scope="col">Preço</th>
                <th scope="col">Q.Vendidas</th>
                <th scope="col">Anual</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <a href="#">
                    <img src={require("../../../assets/images/product-1.jpg")} alt="" />
                  </a>
                </th>
                <td>
                  <a href="#" className="text-primary fw-bold">
                    Air jordan fake
                  </a>
                </td>
                <td>$64</td>
                <td className="fw-bold">124</td>
                <td>$5,828</td>
              </tr>
              <tr>
                <th scope="row">
                  <a href="#">
                    <img src={require("../../../assets/images/product-2.jpg")} alt="" />
                  </a>
                </th>
                <td>
                  <a href="#" className="text-primary fw-bold">
                    Apple Watch
                  </a>
                </td>
                <td>$46</td>
                <td className="fw-bold">98</td>
                <td>$4,508</td>
              </tr>
              <tr>
                <th scope="row">
                  <a href="#">
                    <img src= {require("../../../assets/images/product-3.jpg")} alt="" />
                  </a>
                </th>
                <td>
                  <a href="#" className="text-primary fw-bold">
                    Tira Odor
                  </a>
                </td>
                <td>$59</td>
                <td className="fw-bold">74</td>
                <td>$4,366</td>
              </tr>
              <tr>
                <th scope="row">
                  <a href="#">
                    <img src={require("../../../assets/images/product-4.jpg")} alt="" />
                  </a>
                </th>
                <td>
                  <a href="#" className="text-primary fw-bold">
                    Oculos gucci
                  </a>
                </td>
                <td>$32</td>
                <td className="fw-bold">63</td>
                <td>$2,016</td>
              </tr>
              <tr>
                <th scope="row">
                  <a href="#">
                    <img src={require("../../../assets/images/product-5.jpg")} alt="" />
                  </a>
                </th>
                <td>
                  <a href="#" className="text-primary fw-bold">
                    JBL V2.6
                  </a>
                </td>
                <td>$79</td>
                <td className="fw-bold">41</td>
                <td>$3,239</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TopVendas;
