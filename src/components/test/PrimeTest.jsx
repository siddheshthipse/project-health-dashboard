import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

const PrimeTest = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [date, setDate] = useState(null);
    
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'London', code: 'LDN' },
        { name: 'Paris', code: 'PRS' },
        { name: 'Tokyo', code: 'TKY' }
    ];

    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
            <Button label="Save" icon="pi pi-check" />
        </div>
    );

    return (
        <div className="p-4">
            <h1 className="text-3xl mb-4">PrimeReact Test</h1>
            
            <Card title="PrimeReact Components" footer={footer} className="mb-4">
                <div className="flex flex-column gap-3">
                    <div className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText placeholder="Search" className="w-full" />
                    </div>
                    
                    <Dropdown
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.value)}
                        options={cities}
                        optionLabel="name"
                        placeholder="Select a City"
                        className="w-full"
                    />
                    
                    <Calendar
                        value={date}
                        onChange={(e) => setDate(e.value)}
                        showIcon
                        placeholder="Select Date"
                        className="w-full"
                    />
                    
                    <div className="flex gap-2">
                        <Button label="Primary" />
                        <Button label="Secondary" className="p-button-secondary" />
                        <Button label="Success" className="p-button-success" />
                        <Button label="Warning" className="p-button-warning" />
                        <Button label="Danger" className="p-button-danger" />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default PrimeTest;