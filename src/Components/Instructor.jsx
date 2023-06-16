

const Instructor = ({ instructor }) => {
    // console.log(instructor);
    return (
        <div className="flex items-center gap-5 p-4 bg-slate-100 bg-opacity-10 rounded-full">
            <div className="overflow-hidden w-28 h-28 rounded-full">
                <img className="w-28 h-28 rounded-full hover:scale-110 transition-all duration-500" src={instructor.image} alt="" />
            </div>
            <div>
                <h2 className="text-2xl">{instructor.name}</h2>
                <h2 className="text-xl text-info">{instructor.email}</h2>
            </div>
        </div>
    );
};

export default Instructor;