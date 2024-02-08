import FilterJobWidget from "@/components/FilterJobWidget";


function MainContent() {
    return (
        <main className="py-5">
            <div>
                <h1 className="text-center font-bold text-3xl mb-4">All developer jobs</h1>
                <p className="text-center text-gray-400">Find your dream job.</p>
                <div>
                    <FilterJobWidget/>
                </div>
            </div>
        </main>
    );
}

export default MainContent;