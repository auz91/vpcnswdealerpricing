import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function VersionSelect({ versions, selectedVersion, setSelectedVersion }) {
  const activeVersions = versions.filter(v => !v.isHidden);
  
  return (
    <Dropdown>
      <Dropdown.Toggle className="text-sm font-light text-gray-500 bg-transparent border-0 hover:text-gray-700 focus:outline-none shadow-none p-0">
        {selectedVersion ? selectedVersion.name : 'Select Version'} ▾
      </Dropdown.Toggle>

      <Dropdown.Menu className="min-w-[150px] py-1 mt-1 bg-white border border-gray-100 rounded-lg shadow-sm">
        {activeVersions.map((version) => (
          <Dropdown.Item
            key={version.id}
            onClick={() => setSelectedVersion(version)}
            className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            {version.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export { VersionSelect }; 