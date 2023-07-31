import React from 'react';

const AnnouncementList = () => {
    // Dummy data for announcements (replace this with actual data from your backend)
    const announcements = [
      { id: 1, title: 'Announcement 1', content: 'This is the content of announcement 1.' },
      { id: 2, title: 'Announcement 2', content: 'This is the content of announcement 2.' },
      // Add more announcements as needed
    ];
  
    return (
      <div>
        <h4>Announcements:</h4>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement.id}>
                <td>{announcement.id}</td>
                <td>{announcement.title}</td>
                <td>{announcement.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

export default AnnouncementList;