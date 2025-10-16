import { useNavigate } from 'react-router';
import { useFetchRacksQuery } from 'services/index';
import type { RackDTO } from 'types/geo';

function TableHeader() {
    return (
        <thead className="bg-gray-50">
            <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">№</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Локация</th>
            </tr>
        </thead>
    );
}

function TableRow({ rack, index, onClick }: { rack: RackDTO; index: number; onClick: (id: number) => void }) {
    return (
        <tr
            className="hover:bg-gray-100 cursor-pointer transition duration-150"
            onClick={() => onClick(rack.id)}
        >
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-infra-blue">{rack.name}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{rack.location}</td>
        </tr>
    );
}


export default function RacksPage() {
    const navigate = useNavigate();

    const { data: racks } = useFetchRacksQuery({});

    const handleRackClick = (rackId: number) => {
        navigate(`/racks/${rackId}`);
    };


    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Стойки</h1>
                <button className="flex items-center bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition">
                    + Добавить стойки
                </button>
            </div>

            <div className='shadow-md rounded-lg overflow-x-auto'>
                <table className="min-w-full divide-y divide-gray-200">
                    <TableHeader />
                    <tbody className="bg-white divide-y divide-gray-100">
                        {racks?.results.map((rack, index) => (
                            <TableRow
                                key={rack.id}
                                rack={rack}
                                index={index}
                                onClick={handleRackClick}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};