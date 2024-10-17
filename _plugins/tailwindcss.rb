require "tailwindcss/ruby"

class TailwindCSS < Jekyll::Converter
  safe true
  priority :low

  def matches(ext)
    ext =~ /^\.css$/i
  end

  def output_ext(ext)
    ext
  end

  def convert(content)
    Open3.capture2("#{Tailwindcss::Ruby.executable} -i -", stdin_data: content).first
  end
end
