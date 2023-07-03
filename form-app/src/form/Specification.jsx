import React from 'react';
import SpecForm from './SpecForm';

function Specification({ spec, setSpec }) {
    // You will replace this with your form logic
    return (
        <main>
            <SpecForm spec={spec} setSpec={setSpec} />
        </main>
    );
}

export default Specification;