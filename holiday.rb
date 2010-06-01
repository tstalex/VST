require 'date'
class HolidayValidator

  def is_holiday(date)
    @holidays.each { |day, name|
      if (day.compare(date))
        return name
      end
    }
    
    if (is_easter(date))
      return "Easter"
    end
    if (is_good_friday(date))
      return "Good Friday"
    end
    ""
  end

  def initialize
    @holidays=Hash.new
    #1 january
    @holidays[Day.new(1, 1)]="1st january"
    @holidays[Day.new(24, 2)]="Indipendence day"
    @holidays[Day.new(1, 5)]="May Day"
    @holidays[Day.new(23, 6)]="Victory Day"
    @holidays[Day.new(24, 6)]="St. John's Day or Midsummer Day"
    @holidays[Day.new(20, 8)]="Day of Restoration of Independence"
    @holidays[Day.new(24, 12)]="Christmas"
    @holidays[Day.new(25, 12)]="Christmas"
    @holidays[Day.new(26, 12)]="Christmas"
  end

  def is_easter (date)
    edate= easter date.year
    if (edate.day==date.day && edate.month==date.month)
      return true
    end
    return false
  end

  def is_good_friday (date)
    edate= good_friday date.year
    if (edate.day==date.day && edate.month==date.month)
      return true
    end
    false
  end

  def easter(some_year)

    golden_number = (some_year % 19) + 1

    if some_year <= 1752 then
      # Julian calendar
      dominical_number = (some_year + (some_year / 4) + 5) % 7
      paschal_full_moon = (3 - (11 * golden_number) - 7) % 30
    else
      # Gregorian calendar
      dominical_number = (some_year + (some_year / 4) - (some_year / 100) + (some_year / 400)) % 7
      solar_correction = (some_year - 1600) / 100 - (some_year - 1600) / 400
      lunar_correction = (((some_year - 1400) / 100) * 8) / 25
      paschal_full_moon = (3 - 11 * golden_number + solar_correction - lunar_correction) % 30
    end

    dominical_number += 7 until dominical_number > 0

    paschal_full_moon += 30 until paschal_full_moon > 0
    paschal_full_moon -= 1 if paschal_full_moon == 29 or (paschal_full_moon == 28 and golden_number > 11)

    difference = (4 - paschal_full_moon - dominical_number) % 7
    difference += 7 if difference < 0

    day_easter = paschal_full_moon + difference + 1

    if day_easter < 11 then
      # Easter occurs in March.
      return DateTime.new(y=some_year, m=3, d=day_easter + 21)
    else
      # Easter occurs in April.
      return DateTime.new(y=some_year, m=4, d=day_easter - 10)
    end

  end

  def good_friday(some_year)
    easter(some_year) - 2
  end

end

class Day
  def compare(date)
    if (date.day==@day && date.month==@month)
      true
    else
      false
    end
  end

  def initialize(day, month)
    @day=day
    @month=month
  end
end