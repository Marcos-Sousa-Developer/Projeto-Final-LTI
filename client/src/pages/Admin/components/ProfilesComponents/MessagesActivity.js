import React from 'react'
//import { CircularProgressbar } from 'react-circular-progressbar';
//import 'react-circular-progressbar/dist/styles.css';

function MessagesActivity() {
  return (
    <div className="col-md-4">
    <div className="h-100">
      <div className="mx-auto d-flex flex-column justify-content-center align-items-center">
        <h5>Mensagens Respondidas</h5>
        <div style={{ width: "60%" }}>
          <CircularProgressbar
            value={10}
            maxValue={100}
            text={`${(10 * 100) / 100}%`}
            styles={{
              root: { paddingBottom: "8px" },
              trail: { stroke: "#d6d6d6" },
              path: { stroke: "#EB5C1F" },
              text: { fontSize: "16px", fill: "#EB5C1F" },
            }}
          />
        </div>
        <h5>Total: 100</h5>
      </div>
    </div>
  </div>
  )
}

export default MessagesActivity