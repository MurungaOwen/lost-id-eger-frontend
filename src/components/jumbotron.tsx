import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription } from "./ui/card";
import CardSkeleton from "./ui/skeleton";
import toast from "react-hot-toast";
// Define the type for your card data
interface CardData {
    id: number;
    image_url: string;
    contact: string;
    reg_number: string;
    course: string;
}

export const JumboTron = () => {
    const [search, setSearch] = useState("");
    const [cards, setCards] = useState<CardData[]>([]); // Typed as CardData[]
    const [loading, setLoading] = useState(true); // Loading state

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearch = async() => {
        try{
            const searchedCard = await fetch(`http://localhost:5000/search?reg_no=${search}`);
            const data = await searchedCard.json()
            setCards(data);
            console.log("Searching for:", search);
        }catch(err) {
            const msg = (err instanceof Error)? err.message : "Unable to do search"
            toast.error(msg)
        }
    };

    useEffect(() => {
        // Simulate delayed fetch with setTimeout to see skeleton first
        const fetchCards = async () => {
            setLoading(true); // Start loading
            try {
                //const response = await fetch("/data.json");
                const response = await fetch("http://localhost:5000/list");
                const data = await response.json();
                console.log("data is :", data)
                setTimeout(() => {
                    setCards(data); 
                    setLoading(false);
                }, 2000); // 2 second delay
            } catch (error) {
                toast.error("Error fetching Id cards");
                setLoading(false); // Stop loading in case of error
            }
        };

        fetchCards();
    }, []);

    return (
        <>
            <div className="font-mono flex space-x-2 items-center w-full">
                <div className="flex w-full sm:max-w-lg">
                    <Input
                        type="text"
                        placeholder="Enter Reg No..."
                        value={search}
                        onChange={handleChange}
                        className="font-serif w-full rounded-r-none"
                    />
                    <Button
                        onClick={handleSearch}
                        className="w-auto rounded-l-none text-white bg-teal-500 hover:bg-teal-900 border-l-0"
                    >
                        <SearchIcon />
                    </Button>
                </div>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-full mt-4 pt-5 justify-center ${loading ? "z-10" : ""}`} >
                {loading ? (
                    // Show skeleton loaders when loading
                    Array(20)
                        .fill(0)
                        .map((_, index) => <CardSkeleton key={index} />)
                ) : (
                    cards ? cards.map((card) => (
                        <Card key={card.id} className="mt-1 overflow-hidden rounded-md">
                            <CardContent className="p-0">
                                <img 
                                    src={card.image_url} 
                                    alt={card.reg_number}
                                    className="w-full h-64 object-cover" // Ensures image fits the card
                                />
                                <CardDescription className="p-4 text-teal-600">{card.course} : {card.reg_number}</CardDescription> {/* Add padding back to description */}
                            </CardContent>
                        </Card>
                    )) : <p>No Ids have been added yet:) clicke here to upload<Link to="/upload"/></p>
                    
                )}
            </div>
        </>
    );
};
