import React from 'react';

const NewCard = ({data}) => {

    const shortText = (text, size) => {
        const result = text.slice(0, size);
        return result
    }
    const dateCreate = (date)=> {
        const d = new Date(date)
        return (d.getFullYear()+"/"+d.getMonth()+"/"+d.getDay())
    }
    return (
        <>
        {data.map((el) =>
            <div className="new-card border b-2 border-black rounded-md ml-3 mt-3 hover:opacity-90 ">
                <img src={el.imgURL} alt="" srcset="" />
                <div className="new-details p-2">
                    <h2 className="font-semibold text-blue-800">{shortText(el.description,60)}</h2>


                    <p className="pt-2">{shortText(el.description, 100)+"..."} <span onClick={() =>{window.location.href = el.shareURL;}} className="text-blue-700 underline cursor-pointer">Read More</span></p>


                    <div className="new-footer flex items-center mt-2">
                        <i className="fa-regular fa-clock text-gray-400"></i>
                        <p className="ml-1 text-gray-800"> {dateCreate(el.feedDate)}</p>
                        <i className="fa-regular fa-user ml-auto text-gray-400"></i>
                        <p className="ml-1 text-gray-800">{el.source}</p>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default NewCard;