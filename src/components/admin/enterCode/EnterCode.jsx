import { useState, useEffect, useRef } from "react";
import Toggle from "../../toggle/Toggle";
import AdminHeader from "../header/Header";

const EnterCode = ({ title, currentUsers, userLimit, dateLimit, onContextMenu }) => {
    const getUserLimitColor = (currentUsers, userLimit) => {
        if (currentUsers <= userLimit / 3) {
            return "text-green-500";
        } else if (currentUsers <= (2 * userLimit) / 3) {
            return "text-yellow-500";
        } else {
            return "text-red-500";
        }
    };

    const handleContextMenuClick = (event) => {
        event.preventDefault();
        const top = event.clientY - 480;
        const left = event.target.clientX;
        onContextMenu(left, top, title);
    };
    
    

    return (
        <li onContextMenu={handleContextMenuClick} className="w-[30rem] bg-background-org text-background-white rounded-xl m-2 p-4 flex justify-between items-center">
            <section>
                {title}
            </section>
            <section className="flex">
                <div className={`m-2 ${getUserLimitColor(currentUsers, userLimit)}`}>
                    {currentUsers}/{userLimit}
                </div>
                <div className="m-2 text-background-elm2">
                    {dateLimit}
                </div>
                <div className="m-2 relative">
                    <input type="checkbox" className="hidden" name="options" id={`options-${title}`} />
                    <label htmlFor={`options-${title}`} onClick={handleContextMenuClick} className="cursor-pointer text-background-elm w-8 rounded-full h-8 border-2 border-background-elm flex items-center justify-center bg-red-950 transition-all duration-200 hover:bg-background-elm hover:text-red-950">
                        <i className="fa-solid fa-ellipsis"></i>
                    </label>
                </div>
            </section>
        </li>
    );
};

const EnterCodes = () => {
    const [selected, setSelected] = useState('actives');
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, currentItem: null });

    const contextMenuRef = useRef(null);

    const ContextMenu = () => {
        const contextMenuValues = [
            {
                title: "ویرایش",
                icon: <i className="fa-solid fa-pen-to-square"></i>
            },
            {
                title: "افزایش نفرات",
                icon: <i className="fa-solid fa-person-circle-plus"></i>
            },
            {
                title: "افزایش اعتبار",
                icon: <i className="fa-solid fa-calendar-plus"></i>
            },
            {
                title: "حذف",
                icon: <i className="fa-solid fa-trash-can"></i>
            },
        ];

        const ContextMenuItem = ({ title, icon }) => {
            return (
                <button className="text-background-white transition-all duration-200 hover:bg-background-elm2 m-2 p-3 cursor-pointer flex justify-between items-center w-48 rounded-lg">
                    {title}
                    {icon}
                </button>
            );
        };

        return (
            <ul className="absolute z-50 backdrop-blur-lg rounded-3xl" style={{ top: contextMenu.y, left: 0 }} ref={contextMenuRef}>
                {contextMenuValues.map((contextMenuValue, index) =>
                    <ContextMenuItem key={index} title={contextMenuValue.title} icon={contextMenuValue.icon} />
                )}
            </ul>
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
                setContextMenu({ ...contextMenu, visible: false });
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [contextMenu]);

    const handleContextMenu = (x, y, currentItem) => {
        setContextMenu({
            visible: true,
            x,
            y,
            currentItem
        });
    };

    const enterCodesValues = [
        {
            title: "19456",
            userLimit: 60,
            currentUsers: 60,
            dateLimit: "1403/04/13",
            canEdit: false
        },
        {
            title: "12345",
            userLimit: 10,
            currentUsers: 5,
            dateLimit: "1403/06/03",
            canEdit: false
        },
        {
            title: "76835",
            userLimit: 7,
            currentUsers: 1,
            dateLimit: "1403/12/01",
            canEdit: false
        },
        {
            title: "95334",
            userLimit: 25,
            currentUsers: 20,
            dateLimit: "1403/04/05",
            canEdit: false
        },
    ];

    return (
        <>
            <AdminHeader />
            <Toggle
                first={`actives`}
                secend={`new`}
                firstTitle={`کد های فعال`}
                secendTitle={`کد جدید`}
                top={100}
                onToggle={(value) => setSelected(value)}
            />
            {selected === 'actives' ? (
                <ul className="absolute bg-background-elm2 rounded-3xl top-56 right-[50%] translate-x-[50%]">
                    {contextMenu.visible && <ContextMenu />}
                    {enterCodesValues.map((enterCodesValue, index) =>
                        <EnterCode
                            key={index}
                            title={enterCodesValue.title}
                            userLimit={enterCodesValue.userLimit}
                            currentUsers={enterCodesValue.currentUsers}
                            dateLimit={enterCodesValue.dateLimit}
                            onContextMenu={handleContextMenu}
                        />
                    )}
                </ul>
            ) : (
                <div className="relative top-56">
                    
                </div>
            )}
        </>
    );
}

export default EnterCodes;
