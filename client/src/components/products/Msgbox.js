import React from 'react'

const Msgbox = ({setModal, text}) => {

    
    return (

        <div className="d.flex position-absolute" tabindex="-1" role="dialog" style={styleObj}>
                <div className="modal-dialog-centered" role="document">
                    <div class="modal-content">
                            <div className="modal-header">

                                <h5 className="modal-title">DW SHOP</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>setModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <p>{text}</p>
                            </div>

                            <div class="modal-footer">                        
                                <button className="btn btn-secondary" onClick={()=>setModal(false)} >Close</button>
                            </div>
                            
                    </div>
                </div>
            </div>

        
    )
}

export default Msgbox

const styleObj = {
    height: "100px", 
    minHeight: "100vh",   
     
    
    left:0,

}