function CaseProfile({ profiles }) {
  // console.log(profiles)
  return (
    <>
      {profiles.map((profile) => (
        <li key={profile.id} className="grid gap-2 mb-4">
          <p className="text-heading-sm">
            {profile.type === "paragraph--logolink"
              profile.field_logos}
          </p>
          {profile.field_website && (
            <ul className="flex flex-wrap grap-2">
              {profile.field_website.map((item, index) => (
                <li
                  key={item.title + index}
                  className="font-bold p-1 rounded-md text-primary-400"
                >
                  <a href={item.full_url}>{item.title}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  );
}

export default CaseProfile;
