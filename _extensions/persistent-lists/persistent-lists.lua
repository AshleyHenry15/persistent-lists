-- persistent-lists.lua
-- A simple Quarto filter to enable persistent task lists using localStorage

-- Main filter function
function Pandoc(doc)
  -- Only apply to HTML outputs
  if not quarto.doc.is_format("html") then
    return doc
  end

  -- Add our SCSS and JavaScript resources
  quarto.doc.add_html_dependency({
    name = "persistent-lists",
    version = "1.0.0",
    stylesheets = {"persistent-lists.scss"},
    scripts = {"persistent-lists.js"}
  })

  -- Return the modified document
  return doc
end